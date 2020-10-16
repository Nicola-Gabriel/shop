using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapp;
        public ProductsController(IGenericRepository<Product> productsRepo, IGenericRepository<ProductBrand> productBrandRepo,
        IGenericRepository<ProductType> productTypeRepo, IMapper mapp)
        {
            _mapp = mapp;
            _productTypeRepo = productTypeRepo;
            _productBrandRepo = productBrandRepo;
            _productsRepo = productsRepo;

        }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductToReturnDTO>>> GetProducts()
    {
        var spec = new ProductWithTypesAndBrandsSpecifications();
        var products = await _productsRepo.ListAsync(spec);

        return Ok(_mapp.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id)
    {
        var spec = new ProductWithTypesAndBrandsSpecifications(id);
        var product = await _productsRepo.GetEntityWithSpec(spec);

        return _mapp.Map<Product, ProductToReturnDTO>(product);
        
    }

    [HttpGet("brands")]
    public async Task<ActionResult<ProductBrand>> GetProductBrandsAsync()
    {
        return Ok(await _productBrandRepo.ListAllAsync());
    }
    [HttpGet("types")]
    public async Task<ActionResult<ProductType>> GetProductTypesAsync()
    {
        return Ok(await _productTypeRepo.ListAllAsync());
    }
}
}