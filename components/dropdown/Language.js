'use strict'

import Link from 'next/link'
import React from 'react'
import { translate } from 'react-i18next'
import i18n from '../../src/app/i18n'
import { DropdownButton, MenuItem } from 'react-bootstrap'

const Language = () => (
    <DropdownButton title={i18n.t('language')} id="language">
        <MenuItem eventKey="en" onClick={() => { i18n.changeLanguage('en'); }}>{i18n.t('nav.en')}</MenuItem>
        <MenuItem eventKey="zh_HK" onClick={() => { i18n.changeLanguage('zh_HK'); }}>{i18n.t('nav.zh_HK')}</MenuItem>
    </DropdownButton>
)

const Extended = translate('common')(Language);
export default Extended