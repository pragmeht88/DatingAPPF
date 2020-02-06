using System;

namespace DatingAPP.API.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderID { get; set; }
        public virtual User Sender { get; set; }
        public int RecipientId { get; set; }
        public virtual User Recipient { get; set; }
        public string Content { get; set; }
        public bool IsRead { get; set; }
        public DateTime? DateRead { get; set; }
         public DateTime MessageSent { get; set; }
         public bool senderDeleted { get; set; }
         public bool RecipientDeleted { get; set; }
    }
}