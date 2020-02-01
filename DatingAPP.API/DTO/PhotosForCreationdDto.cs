using System;
using Microsoft.AspNetCore.Http;

namespace DatingAPP.API.DTO
{
    public class PhotosForCreationdDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }
        public PhotosForCreationdDto()
        {
            DateAdded= DateTime.Now;
        }
    }
}