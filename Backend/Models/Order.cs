namespace WebShopTest.Models
{
    public class Order
    {
        public int Id { get; set; }
        public User User { get; set; }
        List<Product> Products { get; set; }
    }
}
