using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Stockmanager.Models
{
    public class ComponentType
    {
        public ComponentType()
        {
            Components = new List<Component>();
            CategoryComponentType = new List<CategoryComponentType>();
        }

        public long ComponentTypeId { get; set; }
        public string ComponentName { get; set; }
        public string ComponentInfo { get; set; }
        public string Locaton { get; set; }
        public ComponentTypeStatus Status { get; set; }
        public string Datasheet { get; set; }
        public string ImageUrl { get; set; }
        public string Manufacturer { get; set; }
        public string WikiLink { get; set; }
        public string AdminComment { get; set; }
        public virtual ESImage Image { get; set; }

        public ICollection<Component> Components { get; protected set; }
        public ICollection<CategoryComponentType> CategoryComponentType { get; protected set; }
        

    }
    public enum ComponentTypeStatus
    {
        Available,
        ReservedAdmin
    }
    public class ESImage
    {
        public long ESImageId { get; set; }
        [MaxLength(128)]
        public string ImageMimeType { get; set; }
        public byte[] Thumbnail { get; set; }
        public byte[] ImageData { get; set; }
    }
}