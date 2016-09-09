using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using HtmlAgilityPack;

namespace LanTing.MatrixWriter.Models
{
    /// <summary>
    /// Extensions for blog detectors
    /// </summary>
    public static class BlogDetectorExtensions
    {
        /// <summary>
        /// Detects the asynchronous.
        /// </summary>
        /// <param name="manager">The manager.</param>
        /// <returns></returns>
        public static async Task<IEnumerable<Blog>> DetectAsync( this IBlogDetectorManager manager, BlogAccount account )
        {
            if( manager == null )
                throw new ArgumentNullException("manager");


            IEnumerable<Blog>  blogs = null;

            foreach( var detector in manager.Detectors )
            {
                var result = await detector.Detect(account);
                if( result != null )
                {
                    blogs = result;
                    break;
                }
            }

            return blogs;
        }
        /// <summary>
        /// Gets the content of the page.
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <returns></returns>
        public static async Task<string> GetPageContentAsync( this string url )
        {
            string responseBody = string.Empty;

            try
            {
                HttpClientHandler handler = new HttpClientHandler( );
                handler.UseDefaultCredentials = true;
                handler.AllowAutoRedirect = true;
                HttpClient client = new HttpClient(handler);
                HttpResponseMessage response = await client.GetAsync(url);

                response.EnsureSuccessStatusCode( );

                responseBody = await response.Content.ReadAsStringAsync( );
            }
            catch( Exception )
            {
                throw;
            }
            return responseBody;
        }
        /// <summary>
        /// Parses the blog links asynchronous.
        /// </summary>
        /// <param name="body">The body.</param>
        /// <returns></returns>
        public static async Task<BlogLinks> ParseBlogLinksAsync( this string body )
        {
            return await Task.Run<BlogLinks>(( ) =>
            {
                BlogLinks links = new BlogLinks( );
                HtmlDocument doc = new HtmlDocument( );
                doc.LoadHtml(body);

                var root = doc.DocumentNode;
                var header = root.Descendants( ).FirstOrDefault(x => x.Name == "head");
                if( header != null )
                {
                   var titleNode = header.Descendants().FirstOrDefault( x=> x.Name == "title" );
                   if( titleNode != null )
                       links.Title = titleNode.InnerText;
                }

                foreach( var node in root.Descendants( ).Where(x => x.Name == "link") )
                {
                    var relValue = node.GetAttributeValue("rel", string.Empty);
                    if( relValue.ToUpper( ) == BlogLinks.RsdAttribute.ToUpper( ) )
                    {
                        links.RsdLink = node.GetAttributeValue("href", string.Empty);
                    }
                    else if( relValue.ToUpper( ) == BlogLinks.ManifestAttribute.ToUpper( ) )
                    {
                        links.ManifestLink = node.GetAttributeValue("href", string.Empty);
                    }
                    else if( relValue.ToUpper( ) == BlogLinks.PingbackAttribute.ToUpper( ) )
                    {
                        links.PingbackLink = node.GetAttributeValue("href", string.Empty);
                    }
                }
                return links;
            });
        }
        /// <summary>
        /// Parses the API link.
        /// </summary>
        /// <param name="rsdLink">The RSD link.</param>
        /// <returns></returns>
        public static async Task<string> ParseApiLink( this string rsdLink )
        {
            string content = await GetPageContentAsync(rsdLink);
            XDocument doc = XDocument.Parse(content);
            XNamespace defaultNamespace = doc.Root.Attribute("xmlns").Value;

            var apis = doc.Root.Descendants(defaultNamespace + "api");
            if( apis.Any( ) )
                return apis.FirstOrDefault( ).Attribute("apiLink").Value;
            else
                return string.Empty;
        }
        /// <summary>
        /// Parses the manifest.
        /// </summary>
        /// <param name="manifestLink">The manifest link.</param>
        public static async void ParseManifest( this string manifestLink )
        {
            string content = await GetPageContentAsync(manifestLink);
            XDocument doc = XDocument.Parse(content);
            XNamespace defaultNamespace = doc.Root.Attribute("xmlns").Value;

            //var options = doc.Root.Element(defaultNamespace + "options");
            //options.Elements( )
            //       .Select(x => new { Name = x.Name, Value = (object)x.Value })
            //       .ToDictionary(x => x.Name , x =>
            //       {
            //           string value = x.Value.ToString( ).ToUpper( );
            //           if( value == "YES" )
            //               return true;
            //           else if( value == "NO" )
            //               return false;
            //           else
            //               return x.Value;
            //       }, StringComparer.OrdinalIgnoreCase);
        }
    }
}
