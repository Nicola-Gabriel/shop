using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandsSpecifications : BaseSpecification<Product>
    {
        public ProductWithTypesAndBrandsSpecifications()
        {
            AddIncludes(p => p.ProductBrand);
            AddIncludes(p => p.ProductType);
        }

        public ProductWithTypesAndBrandsSpecifications(int id)
             : base(x => x.Id == id)
        {
            AddIncludes(p => p.ProductBrand);
            AddIncludes(p => p.ProductType);
        }
    }
}