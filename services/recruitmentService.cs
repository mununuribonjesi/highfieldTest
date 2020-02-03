using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using highfield.Dtos;
using highfield.Entities;

namespace highfield.services
{
    public class recruitmentService:IRecruitmentService
    {
        HttpClient client = new HttpClient();
      
        List<user> userList = new List<user>();
        List<TopColoursDTO> topColours = new List<TopColoursDTO>();
        List<AgePlusTwentyDTO> Age = new List<AgePlusTwentyDTO>();
        string url = "https://recruitment.highfieldqualifications.com/api/test";

        public async Task<IEnumerable<TopColoursDTO>> TopColours(string orderList)
        {
            await GetUsers();

            if (orderList.Equals("colour"))
            {
                return topColours.OrderBy(x => x.Colour);
            }
           else
            { 
                return topColours.OrderByDescending(x => x.Count);
            }
        }

        public void Response(ResponseDTO response)
        {        
            var content = new StringContent(response.ToString(),Encoding.UTF8, "application/json");
            var result = client.PostAsync(url, content).Result;
            Console.WriteLine(result);
        }

        public async Task<IEnumerable<AgePlusTwentyDTO>> AgePlusTwenty()
        {
            await GetUsers();
            return Age;
        }

        public async Task<IEnumerable<user>> GetUsers()
        {
            Dictionary<string, string> dictionaryUsers = new Dictionary<string, string>();
            HttpResponseMessage response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var people = await response.Content.ReadAsAsync<IEnumerable<user>>();

                foreach (var person in people)
                {
                    userList.Add(new user()
                    {
                        Id = person.Id,
                        FirstName = person.FirstName,
                        LastName =  person.LastName,
                        Email = person.Email,
                        Dob = person.Dob,
                        FavouriteColour = person.FavouriteColour
                    });

                    Age.Add(new AgePlusTwentyDTO()
                    {
                        UserId = person.Id,
                        OriginalAge = DateTime.Now.Year - person.Dob.Year,
                        AgePlusTwenty = (DateTime.Now.Year - person.Dob.Year) + 20

                    });

                    if (!dictionaryUsers.ContainsKey(person.FavouriteColour))
                    {
                        dictionaryUsers.Add(person.FavouriteColour, person.FirstName);
                    }                       
                }
            }
 
            foreach (KeyValuePair<string, string> userKeyValuePair in dictionaryUsers)
            {
                var people = await response.Content.ReadAsAsync<IEnumerable<user>>();

                topColours.Add(new TopColoursDTO()
                {
                    Colour = userKeyValuePair.Key,
                    Count = userList.Where(x => x.FavouriteColour.Equals(userKeyValuePair.Key)).Count()
                }); ;
            }
            Console.WriteLine(topColours);
            return userList;             
        }           
    }
}



