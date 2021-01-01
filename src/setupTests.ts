import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
import Enzyme from 'enzyme'

import '@testing-library/jest-dom'

Enzyme.configure({ adapter: new EnzymeAdapter() })
