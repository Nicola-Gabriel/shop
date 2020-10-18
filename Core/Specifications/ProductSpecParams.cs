namespace Core.Specifications
{
    public class ProductSpecParams
    {
        public string Sort { get; set; }
        public int? BrandId { get; set; }
        public int? TypeId  {get; set;}
        public int PageMaxSize { get; set; } = 50;
        public int PageIndex { get; set; } = 1;

        private int _pageSize = 8;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > PageMaxSize)? PageMaxSize : value;
        }

        private string _search;
        public string Search
        {  
            get => _search;
            set => _search = value.ToLower();
        }


    }
}