import { ReactWrapper, ShallowWrapper } from 'enzyme'

/**
 * Return node(s) with the given data-test attribute
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
type Wrapper = ShallowWrapper | ReactWrapper

export const findByTestAttr = (wrapper: ShallowWrapper | ReactWrapper, val: string) => {
  return wrapper.find(`[data-testid='${val}']`)
}
