
export const registerFormControls = [
    {
        id: 1,
        name: 'username',
        label: 'User Name',
        placeholder: 'Enter your username',
        componentType: 'input',
        type: 'text'
    },
    {
        id: 2,
        name: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        componentType: 'input',
        type: 'email'
    },
    {
        id: 3,
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'
    }
]

export const loginFormControls = [
    {
        id: 1,
        name: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        componentType: 'input',
        type: 'email'
    },
    {
        id: 2,
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'
    }
]


export const addCategoryFormElements = [
    {
        label: 'Category name',
        name: 'categoryName',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter category name'
    }
]

export const shoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home'
    },
    {
        id: 'men',
        label: 'Men',
        path: '/shop/listing'
    },
    {
        id: 'women',
        label: 'Women',
        path: '/shop/listing'
    },
    {
        id: 'kids',
        label: 'Kids',
        path: '/shop/listing'
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shop/listing'
    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shop/listing'
    }
]

export const sortOptions = [
    {id: 'price-lowtohigh', label: 'Price Low to High' },
    {id: 'price-hightolow', label: 'Price High to Low' },
    {id: 'title-atoz', label: 'Title A to Z' },
    {id: 'title-ztoa', label: 'Title Z to A' },
]