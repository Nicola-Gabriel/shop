using System;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Order> builder)
        {
           builder.OwnsOne(o => o.AddressToSend, a => {
               a.WithOwner();
           });

           builder.Property(s => s.OrderStatus).HasConversion(
               o => o.ToString(),
               o => (OrderStatus) Enum.Parse(typeof(OrderStatus), o)
           );

           builder.HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}