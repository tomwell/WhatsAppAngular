namespace WA.API.Users;

public static class UserFakeDb
{
    private static readonly IEnumerable<User> users = [
        new User(new Guid("a6c4d3f4-5c5b-4b59-9e4c-7a0d3f4b5b59"), "Alessandro Cassa"),
        new User(new Guid("a6c4d3f4-5c5b-9874-2587-159876547895"), "Lucina Vianna"),
        new User(new Guid("a6c4d3f4-5c5b-1235-7895-254523132132"), "Alexia Vianna"),
    ];

    public static readonly ICollection<UserImage> userImages = [];


    public static IEnumerable<User> GetAll() => users;

    public static User? GetById(Guid id) => users.FirstOrDefault(f => f.Id == id);
}
