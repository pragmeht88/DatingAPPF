using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingAPP.API.DTO;
using DatingAPP.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
           opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
           .ForMember(dest => dest.Age, opt =>
            opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<User, UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
           opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt =>
            opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, photoFromReturnDto>();
            CreateMap<PhotosForCreationdDto, Photo>();
            CreateMap<UserForRegisterDto, User>();

            CreateMap<MessageForCreationDto, Message>().ReverseMap();

            CreateMap<Message, MessageForReturnDto>()
            .ForMember(m => m.SenderPhotoUrl, opt => opt
              .MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(m => m.RecipientPhotoUrl, opt => opt
              .MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}