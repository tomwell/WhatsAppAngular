using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;

namespace WA.API.Users;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await Task.FromResult(UserFakeDb.GetAll()));

    [HttpGet("{id}")]
    public IActionResult Get(Guid id) => Ok(UserFakeDb.GetById(id));


    [HttpPut("{userId}/image")]
    public async Task<IActionResult> Put(Guid userId, [FromForm] IFormFile file) 
    {        
        if(file != null){
            using MemoryStream ns = new MemoryStream();
            await file.CopyToAsync(ns);

            var userImage = UserFakeDb.userImages.FirstOrDefault(f => f.UserId == userId);
            if(userImage != null)
                userImage.UpdateImage(ns.ToArray());
            else
                UserFakeDb.userImages.Add(new UserImage(userId, ns.ToArray()));

            return Ok(await Task.FromResult(new { msg = "Image updated"}));
        }
        return BadRequest(await Task.FromResult(new { msg = "No image found"}));
    }

    [HttpGet("{userId}/image")]
    public async Task<IActionResult> GetImage(Guid userId) 
    {
        var userImage = UserFakeDb.userImages.FirstOrDefault(f => f.UserId == userId);
        
        if(userImage == null) NotFound(await Task.FromResult("No image found"));

        return Ok(await Task.FromResult(File(userImage.Image, "image/png")));
    } 
    
}
