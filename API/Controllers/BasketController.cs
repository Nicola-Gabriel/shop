using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;
        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _mapper = mapper;
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> SetBasketAsync(CustomerBasketDto basket)
        {
            var basketZ = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);
            var createdBasket = await _basketRepository.UpdateBasketAsync(basketZ);
            return Ok(createdBasket);
        }

        [HttpDelete]
        public async Task DeleteItems(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }
    }
}