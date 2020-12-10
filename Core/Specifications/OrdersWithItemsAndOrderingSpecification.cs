using System;
using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrdersWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersWithItemsAndOrderingSpecification(string email)
            : base(o => o.BuyerEmail == email)
        {
            AddIncludes(i => i.DeliveryMethod);
            AddIncludes(i => i.OrderItems);
            AddOrderByDescending(i => i.DateTime);

        }

        public OrdersWithItemsAndOrderingSpecification(int id, string email) 
            : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddIncludes(i => i.DeliveryMethod);
            AddIncludes(i => i.OrderItems);
        }
    }
}