import { expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import Calculator from './Calculator'

describe('Calculator test inputs', ()=>{
    it('Test operand1 input value', ()=>{
        const wrapper = mount(Calculator)
        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('1')
        // op1.element.value = '1'
        // op1.trigger('input')
        expect(wrapper.vm.operand1).toBe(1)
    })

    it('Test operand2 input value', ()=>{
        const wrapper = mount(Calculator)
        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')
        // op1.element.value = '1'
        // op1.trigger('input')
        expect(wrapper.vm.operand2).toBe(2)
    })
})

describe('Calculator test operations', ()=>{
    it('Test method sum', ()=>{
        const wrapper = mount(Calculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('1')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="+"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(3)
    })

    it('Test method sub', ()=>{
        const wrapper = mount(Calculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('4')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="-"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(2)
    })

    it('Test method mul', ()=>{
        const wrapper = mount(Calculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('4')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="*"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(8)
    })

    it('Test method div', ()=>{
        const wrapper = mount(Calculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('6')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="/"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(3)
    })

    it('Test method div when second operand', ()=>{
        const wrapper = mount(Calculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('6')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('0')

        const btnSum = wrapper.find('button[name="/"]')
        btnSum.trigger('click')

        expect(wrapper.vm.error).toBe("На 0 делить нельзя!")
    })

    it('Test method deg', ()=>{
        const wrapper = mount(Calculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('4')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="**"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(16)
    })

    it('Test method rem', ()=>{
        const wrapper = mount(Calculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('7')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="%"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(3)
    })

    test('Test Backspace', () => {
        const wrapper = mount(Calculator, {
            data: () => {
                return {
                    log: true,
                }
            }
        })
        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('100')
        const btnDel = wrapper.find('button[id="delete"]')
        btnDel.trigger('click')

        expect(wrapper.vm.op1).toBe(10)
    })

    test('Test InputText with display keyboard', () => {
        const wrapper = mount(Calculator, {
            data: () => {
                return {
                    log: true,
                }
            }
        })
        const btn = wrapper.find('button[name="1"]')
        btn.trigger('click')
        expect(wrapper.vm.op1).toBe(1)
    })

    test('Test Radio Button', () => {
        const wrapper = mount(Calculator)
        const btn = wrapper.find('input[id=checkbox]')
        btn.setChecked()
        expect(wrapper.vm.log).toBeTruthy()
    })

    test('Test Choice Operand', () => {
        const wrapper = mount(Calculator, {
            data: () => {
                return {
                    log: true,
                }
            }
        })
        const btn = wrapper.find('input[name="two"]')
        btn.setChecked()
        expect(wrapper.vm.operand).toBe("operand2")
    })

})