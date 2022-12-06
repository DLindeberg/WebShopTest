using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebShopTest.Data;
using WebShopTest.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebShopTest.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        // GET: api/Products
        // GET all products
        [HttpGet]
        public IActionResult Get()
        {
            using (var db = new WebShopDBContext())
            {
                var products = db.Products.ToList();
                return Ok(products);
            }
        }

        // GET api/Products/5
        // GET single product
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            using (var db = new WebShopDBContext())
            {
                var product = db.Products.FirstOrDefault(x => x.Id == id);
                if (product != null)
                {
                    return Ok(product);
                }
                else return NotFound();
            }
        }
        [HttpPost("Search")]
        public IActionResult Search([FromBody]string searchString)
        {
            using (var db = new WebShopDBContext())
            {
                var product = db.Products.Where(x => x.Name.Contains(searchString));
                var result = product.ToList();
                int check = result.Count();
                if (check > 0)
                {
                    return Ok(result);
                }
                else return NotFound();
            }
        }

        // POST api/Products
        // POST(Add) product
        [HttpPost]
        public IActionResult Post([FromBody] Product value)
        {
            if (value != null)
            {
                using (var db = new WebShopDBContext())
                {
                    db.Products.Add(new Product()
                    {
                        Name = value.Name,
                        Price = value.Price
                    });
                    db.SaveChanges();
                    return Ok();
                }
            }
            else return BadRequest();
        }

        // PUT api/Products/5
        // PUT(Edit) single product
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Product value)
        {
            using (var db = new WebShopDBContext())
            {
                var product = db.Products.Where(x => x.Id == id).FirstOrDefault();
                if (product != null)
                {
                    product.Name = value.Name;
                    product.Price = value.Price;
                    db.SaveChanges();
                    return Ok();
                }
                else return NotFound();
            }
        }

        // DELETE api/Products/5
        // DELETE single product
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (var db = new WebShopDBContext())
            {
                var product = db.Products.FirstOrDefault(x => x.Id == id);
                if (product != null)
                {
                    db.Products.Remove(product);
                    db.SaveChanges();
                    return Ok();
                }
                else return NotFound();
            }
        }
    }
}
