using System.Collections.Generic;
using System.Threading.Tasks;
using highfield.Dtos;
using highfield.Entities;

namespace highfield.services
{
    public interface IRecruitmentService
    {
        Task<IEnumerable<user>> GetUsers();
        Task<IEnumerable<TopColoursDTO>> TopColours(string colour);
        Task<IEnumerable<AgePlusTwentyDTO>> AgePlusTwenty();
        void Response(ResponseDTO response);
    }
}
