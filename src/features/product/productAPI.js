export function fetchProductsByFilters(filter, pagination) {
    // console.log(filter); // {category: 'laptops'} // {_sort: 'price', _order: 'asc'}
    // filter = {"category": ["laptop", "mobile", "smart watch"]} // we have to set multiple filters on that
    // sort = {_sort: "price", _order="desc"}
    // pagination = {_page:1, _limit=10}
    let queryString = '';

    // filter
    for (let key in filter) {
        const categoryValues = filter[key]; // ["smartphones", laptops]

        if (categoryValues.length) {
            queryString += `${key}=${categoryValues[categoryValues.length - 1]}&`;
        }
    }

    // pagination
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`
    }

    return new Promise(async (resolve) => {
        const res = await fetch(`http://localhost:8080/products?${queryString}`);
        const data = await res.json();
        resolve({ data })
    })
}

export function fetchCategories() {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/categories");
        const data = await response.json();
        resolve({ data })
    })
}

export function fetchBrands() {
    return new Promise(async (resolve) => {
        const res = await fetch("http://localhost:8080/brands");
        const data = await res.json();
        resolve({ data });
    })
}