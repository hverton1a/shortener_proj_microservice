# [URL Shortener Microservice](https://microservice-api-project.herokuapp.com/)

A small microservice api to shortening url, returns a JSON with a original and shortened url.<br/>
The user input the url then submit from the form then receives the JSON. Then by the url [appurl]/api/shorturl/:SHORT with the shortened url will be redirect to the respective site.
<br/>
    <br/>
  <p>NodeJS, Express, Sqlite3, Sequelize and Q</p>
        <p>For the implementation, the app gets the url by a POST from the page form.<br/>
        Checks if is a http(s) protocol.<br/>
        Through a dns lookup check if is a valid host.<br/>
        Check if exists or add the url in a sqlite DB, returning the id as a short url, so will be unique.<br/>
        Return a JSON with the original url and shortened url or if the inputted url was invalid returns a JSON<br/>
        <code>{error: 'invalid url'}</code><br/>
        The user can access the site, adding the shortened url with the app url<br/><code>[appurl]/api/shorturl/:SHORT</code>
        </p>
        <br/>
        <p></p>
    <p>Check it out live on <a href="#">App<a></p>