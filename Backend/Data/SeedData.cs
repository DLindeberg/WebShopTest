using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebShopTest.Models;

namespace WebShopTest.Data
{
    public class SeedData : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasData(
                    new Product
                    {
                        Id = 1,
                        Name = "Radeon GTX 2070",
                        Price = 800
                    },
                    new Product
                    {
                        Id = 2,
                        Name = "Radeon GTX 2080",
                        Price = 1100
                    },
                    new Product
                    {
                        Id = 3,
                        Name = "Radeon GTX 2080 TI",
                        Price = 1500
                    },
                    new Product
                    {
                        Id = 4,
                        Name = "NVIDIA GTX 3070",
                        Price = 1399
                    },
                    new Product
                    {
                        Id = 5,
                        Name = "NVIDIA GTX 3080",
                        Price = 1799
                    },
                    new Product
                    {
                        Id = 6,
                        Name = "NVIDIA GTX 3080 TI",
                        Price = 2249
                    }
                );
        }
    }
}
