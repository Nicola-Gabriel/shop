using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Name).IsRequired().HasMaxLength(50);
            builder.Property(p => p.PictureUrl).IsRequired();
            builder.Property(p => p.Description).IsRequired().HasMaxLength(180);
            builder.HasOne(p => p.ProductBrand).WithMany()
                .HasForeignKey(g => g.ProductBrandId);
            builder.HasOne(p => p.ProductType).WithMany()
                .HasForeignKey(g => g.ProductTypeId);
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
        }
    }
}