using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandsSpecifications : BaseSpecification<Product>
    {
        public ProductWithTypesAndBrandsSpecifications(ProductSpecParams productParams)
            : base (x => 
            (string.IsNullOrEmpty(productParams.Search) 
            || x.Name.ToLower().Contains(productParams.Search)) &&
            (
                !productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId
            ) && (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId))
        {
            AddIncludes(p => p.ProductBrand);
            AddIncludes(p => p.ProductType);
            AddOrderBy(p => p.Name);
            AddPagging(productParams.PageSize * (productParams.PageIndex -1), productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort)){
                switch (productParams.Sort) {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(p => p.Name);
                        break;
                }
            }
        }

        public ProductWithTypesAndBrandsSpecifications(int id)
             : base(x => x.Id == id)
        {
            AddIncludes(p => p.ProductBrand);
            AddIncludes(p => p.ProductType);
        }
    }
}