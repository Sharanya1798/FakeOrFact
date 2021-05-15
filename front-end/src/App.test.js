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
    test('username check',()=>
    {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'sharanya'}});
        expect(wrapper.state('userName')).toEqual('sharanya');
    })

    it('password check',()=>
    {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'sharna'}});
        expect(wrapper.state('password')).toEqual('sharna');
    })
    
    it('login check with right data',()=>
    {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'sharanya'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'sharna'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogin')).toBe(false);
    })
      
    it('login check with wrong data',()=>
    {
        wrapper = shallow(<Login/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'sharanya'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'sharna1'}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('isLogin')).toBe(false);
    })
})

describe('Test case for testing Register',() =>
{
    let wrapper;
    test('username check',()=>
    {
        wrapper = shallow(<Signup/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'sharanya123'}});
        expect(wrapper.state('userName')).toEqual('sharanya123');
    })

    test('email check',()=>
    {
        wrapper = shallow(<Signup/>);
        wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'sharanya123@gmail.com'}});
        expect(wrapper.state('email')).toEqual('sharanya123@gmail.com');
    })

    it('password check',()=>
    {
        wrapper = shallow(<Signup/>);
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'sharna'}});
        expect(wrapper.state('password')).toEqual('sharna');
    })

    it('Confirm password check',()=>
    {
        wrapper = shallow(<Signup/>);
        wrapper.find('input[name="password2"]').simulate('change', {target: {name: 'password2', value: 'sharna'}});
        expect(wrapper.state('password2')).toEqual('sharna');
    })
    
    it('Signup check with right data',()=>
    {
        wrapper = shallow(<Signup/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'sharanya12345'}});
        wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'shubham@gmail.com'}});
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'sharna'}});
        wrapper.find('input[name="password2"]').simulate('change', {target: {name: 'password2', value: 'sharna'}});
        wrapper.find('button').simulate('click');
        console.log(wrapper.state('isSignup'))
        expect(wrapper.state('isSignup')).toBe(false);
    })
      
    it('Signup check with wrong data',()=>
    {
        wrapper = shallow(<Signup/>);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'userName', value: 'sharanya1qwertty'}});
        wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email', value: 'sharanya123@gmail.com'}});
        wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'sharna'}});
        wrapper.find('input[name="password2"]').simulate('change', {target: {name: 'password2', value: 'sharna'}});
        wrapper.find('button').simulate('click');
        console.log(wrapper.state('isSignup'))
        expect(wrapper.state('isSignup')).toBe(false);
    })
})