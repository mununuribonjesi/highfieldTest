using System;
using System.Collections.Generic;
using highfield.Entities;

namespace highfield.Dtos
{
    public class ResponseDTO
    {
        public List<user> Users { get; set; }
        public List<AgePlusTwentyDTO> Ages { get; set; }
        public List<TopColoursDTO> TopColours { get; set; }   
    }
}
