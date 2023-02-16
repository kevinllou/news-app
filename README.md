# Week 02
## Challenge: News App
### Requeriments
- Create a UI that shows a grid of cards containing the news information (image and title), if the user clicks on the card it should redirect to the selected article on the guardian's site.
- Create a search input where the user can request content containing text. If the user does not write ant text on the field, the app must not pass the <strong>q</strong> query param on the request.
- Add a select component where the user can select the language of the news, the options must be: all, english, spanish. You should use the <strong>lang</strong> param for this filter. If the user has selected all, the <strong>lang</strong> query param must not be passed on the request.
- Add a select component where the user can choose the number of news displayed, the options must be: 10, 20, 30, 40, 50. You should use the page-size query param for this filter. 
- Use a throttle or debounce algorithm on the filter features, depending on your implementation, it will be better to use one algorithm or another. Think on the situations where you can use throttle and the situations where you can use debounce. Implement  the one that suites better with your solutions.
- Use localStorage to save user's last filter configurations. For example, if the user's last search was <strong>query</strong>: debate, <strong>spanish</strong>and <strong>page size:</strong> 30, the app must load this configuration on the filters once the users open the webpage again. 
- When the user opens the webpage for the first time, it must load a default filter configuration and do a request with those filters. The default filters config must be: </strong>query: empty, language: all and page size: 10</strong>
