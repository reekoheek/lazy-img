import { define, Component } from '@xinix/xin';
import '../index';

class MyDemo extends Component {
  get template () {
    return `
      <p>Scroll to see image</p>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <p>Wonder woman visible</p>
      <xin-lazy-img src="https://2.bp.blogspot.com/-RlTDWdUkKKA/VvFHNAA_kPI/AAAAAAAByjk/ATOOKfKfIasK1CxZNmoYmPOfywViPoHaQ/s1600/Gal-Gadot-Wonder-Woman.jpg" fallback-src="http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"></xin-lazy-img>
      <p>Unknown image not visible</p>
      <xin-lazy-img src="http://xxx/foo" fallback-src="http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png"></xin-lazy-img>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <p>End of scroll</p>
    `;
  }
}

define('my-demo', MyDemo);
