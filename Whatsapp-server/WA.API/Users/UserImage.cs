namespace WA.API.Users;

public class UserImage
{
    public UserImage(Guid userId, byte[] image)
    {
        UserId = userId;
        Image = image;
    }

    public Guid UserId { get; private set; }
    public byte[] Image { get; private set; }   

    public void UpdateImage(byte[] image) => Image = image;
}

