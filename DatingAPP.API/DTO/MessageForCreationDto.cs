using System;

namespace DatingAPP.API.DTO
{
    public class MessageForCreationDto
    {
        public int SenderID { get; set; }
        public int RecipientId { get; set; }
        public DateTime MessageSent { get; set; }
        public string Content { get; set; }

        public MessageForCreationDto()
        {
            MessageSent = DateTime.Now;
        }
    }
}