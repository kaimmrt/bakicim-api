# bakıcım-api

# Offer

| Route                | HTTP Verb | POST body                    | Description         |
| -------------------- | --------- | ---------------------------- | ------------------- |
| /api/offer/:offer_id | GET       | Empty                        | Get a offer.        |
| /api/offer           | POST      | { to_user_id: 1,price:1000 } | Create a new offer. |

# Favorite

| Route                      | HTTP Verb | POST body                 | Description                 |
| -------------------------- | --------- | ------------------------- | --------------------------- |
| /api/favorite/             | GET       | Empty                     | List all favorites of user. |
| /api/favorite              | POST      | { work_type_price_id: 1 } | Create a new favorite.      |
| /api/favorite/:favorite_id | DELETE    | Empty                     | Delete a favorite.          |

# WorkTypePrice

| Route                                         | HTTP Verb | POST body                                               | Description                             |
| --------------------------------------------- | --------- | ------------------------------------------------------- | --------------------------------------- |
| /api/work_type_price                          | GET       | Empty                                                   | List all work type prices.              |
| /api/work_type_price                          | POST      | { work_type_id: 1, price:1000, note: lorem ipsum amet } | Create a new director.                  |
| /api/work_type_price/:work_type_price_id      | GET       | Empty                                                   | Get a work type price.                  |
| /api/work_type_price/user/:work_type_price_id | GET       | Empty                                                   | Get a work type prices of a user        |
| /api/work_type_price/:work_type_price_id      | PUT       | { work_type_id: 1, price:1000, note: lorem ipsum amet } | Update a work type price with new info. |
| /api/work_type_price/:work_type_price_id      | DELETE    | Empty                                                   | Delete a work type price.               |

# Auth

| Route     | HTTP Verb | POST body                                                             | Description        |
| --------- | --------- | --------------------------------------------------------------------- | ------------------ |
| /register | POST      | {email:'aa@aa.com', username: 'foo', password:'1234',user_type_id:1 } | Create a new user. |
| /login    | POST      | { email: 'foo', password:'1234' }                                     | Generate a token.  |
