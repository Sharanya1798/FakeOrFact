import Login from "./component/login";
import Signup from "./component/Signup";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Enzyme from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

configure({adapter: new Adapter()});

describe('Test case for testing login',() =>
{
    let wrapper;
    test('username field check',()=>
    {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'sharanya'}});
        expect(wrapper.state('userName')).toEqual('sharanya');
    })

    it('password field check',()=>
    {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'sharna'}});
        expect(wrapper.state('password')).toEqual('sharna');
    })
})

describe('Test case for testing Register',() =>
{
    let wrapper;
    test('username field check',()=>
    {
        wrapper = shallow(<Signup/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'sharanya123'}});
        expect(wrapper.state('userName')).toEqual('sharanya123');
    })

    test('email field check',()=>
    {
        wrapper = shallow(<Signup/>);
        wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'sharanya123@gmail.com'}});
        expect(wrapper.state('email')).toEqual('sharanya123@gmail.com');
    })

    it('password field check',()=>
    {
        wrapper = shallow(<Signup/>);
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'sharna'}});
        expect(wrapper.state('password')).toEqual('sharna');
    })

    it('Confirm password field check',()=>
    {
        wrapper = shallow(<Signup/>);
        wrapper.find('input[name="password2"]').simulate('change', {target: {name: 'password2', value: 'sharna'}});
        expect(wrapper.state('password2')).toEqual('sharna');
    })
})