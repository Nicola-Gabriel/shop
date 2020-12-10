using System;
using System.Collections.Generic;

namespace Core.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
        }

        public Order(IReadOnlyList<OrderItem> orderItems, string buyerEmail, Address addressToSend, DeliveryMethod deliveryMethod, decimal subtotal)
        {
            BuyerEmail = buyerEmail;
            AddressToSend = addressToSend;
            OrderItems = orderItems;
            DeliveryMethod = deliveryMethod;
            Subtotal = subtotal;
        }

        public string BuyerEmail { get; set; }
        
        public Address AddressToSend { get; set; }
        
        public DateTimeOffset DateTime { get; set; } = DateTimeOffset.Now;

        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        
        public DeliveryMethod DeliveryMethod { get; set; }
        
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        
        public decimal Subtotal { get; set; }
        public string PaymentIntentId { get; set; }
        
        


        public decimal GetTotal () {
            return Subtotal + DeliveryMethod.Price;
        }
    }
}