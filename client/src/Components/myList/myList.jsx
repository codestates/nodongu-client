import React, { Component } from 'react';
import './myList.css';
import quokka from '../../Utils/images/quokka.jpg';

class MyList extends Component {
  render() {
    return (
      <section className='list-container'>
        <input type='radio' name='slide' id='lisde01' checked />
        <input type='radio' name='slide' id='lisde02' />
        <input type='radio' name='slide' id='lisde03' />

        <div className='slidewrap'>
          <ul className='slidelist'>
            <li>
              <a href=''>
                <label htmlFor='slide03' className='left'>
                  <i class='fas fa-caret-left'></i>
                </label>
                <img src={quokka} />
                <label htmlFor='slide02' className='right'>
                  <i class='fas fa-caret-right'></i>
                </label>
              </a>
            </li>
            <li>
              <a href=''>
                <label htmlFor='slide01' className='left'>
                  <i class='fas fa-caret-left'></i>
                </label>
                <img src={quokka} />
                <label htmlFor='slide03' className='right'>
                  <i class='fas fa-caret-right'></i>
                </label>
              </a>
            </li>
            <li>
              <a href=''>
                <label htmlFor='slide02' className='left'>
                  <i class='fas fa-caret-left'></i>
                </label>
                <img src={quokka} />
                <label htmlFor='slide01' className='right'>
                  <i class='fas fa-caret-right'></i>
                </label>
              </a>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default MyList;
