using System;
using highfield.services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using highfield.Dtos;

namespace highfield.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {

        private readonly recruitmentService _recruitmentService;

        public HomeController(recruitmentService recruitmentService)
        {

            _recruitmentService = recruitmentService;
        }

        [HttpGet("users")]
        public async Task<ActionResult> GetUsers()
        {
            try
            {
                return Ok(await _recruitmentService.GetUsers());
            }
            catch (Exception exception)
            {
                return StatusCode(500, exception);
            }
        }

        [HttpGet("topColour")]
        public async Task<ActionResult> GetTopColourAlphabetical()
        {
            try
            {
                string colour = "colour";
                return Ok(await _recruitmentService.TopColours(colour));
            }
            catch (Exception exception)
            {
                return StatusCode(500, exception);
            }
        }
        [HttpGet("topColourCount")]
        public async Task<ActionResult> GetTopColourCount()
        {
            try
            {
                string count = "count";
                return Ok(await _recruitmentService.TopColours(count));
            }
            catch (Exception exception)
            {
                return StatusCode(500, exception);
            }
        }

        [HttpGet("Age")]
        public async Task<ActionResult> GetAge()
        {
            try
            {
                return Ok(await _recruitmentService.AgePlusTwenty());
            }
            catch (Exception exception)
            {
                return StatusCode(500, exception);
            }
        }

        [HttpPost("Response")]
        public void GetResponse([FromBody] ResponseDTO response)
        {
           _recruitmentService.Response(response);
         
        }
    }
}

