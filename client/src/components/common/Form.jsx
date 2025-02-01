import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText, validationErrors, isBtnDisabled }) => {

  const renderInputsByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || ''
    switch (getControlItem.componentType) {
      case 'input':
        element = <><input type={getControlItem.type} name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.name} value={value} onChange={(e) => setFormData({
          ...formData,
          [getControlItem.name] : e.target.value
        })}  className='px-5 outline-none'/>
        <div>
            {getControlItem.name === 'username' && validationErrors.username && (
              <p className="mt-1 text-sm text-red-500">
                {validationErrors.username}
              </p>
            )}
            {getControlItem.name === 'email' && validationErrors.email && (
              <p className="mt-1 text-sm text-red-500">
                {validationErrors.email}
              </p>
            )}
            {getControlItem.name === 'password' && validationErrors.password && (
              <p className="mt-1 text-sm text-red-500">
                {validationErrors.password}
              </p>
            )}
          </div>
        </>
        break;
      case 'select':
        element = <Select onValueChange={(value) => setFormData({
          ...formData,
          [getControlItem.name] : value
        })} value={value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={getControlItem.placeholder}/>
          </SelectTrigger>
          <SelectContent className="bg-white">
            {getControlItem?.options && getControlItem?.options.length > 0 ? getControlItem?.options?.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null}
          </SelectContent>
        </Select>
        break;
      case 'textarea':
        element = <Textarea 
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        id={getControlItem.id}
        value={value}
        onChange={(e) => setFormData({
          ...formData,
          [getControlItem.name] : e.target.value
        })}
        />
        break;

      default:
        element = <input type={getControlItem.type} name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.name} value={value} onChange={(e) => setFormData({
          ...formData,
          [getControlItem.name] : e.target.value
        })} />
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-4'>
        {
          formControls.map((controlItem) => {
            return (
              <div key={controlItem.id} className='grid w-full'>
                <Label className="mb-1">{controlItem.label}</Label>
                {
                  renderInputsByComponentType(controlItem)
                }
              </div>
            )
          })
        }
      </div>
      <Button type='submit' className='mt-3 w-full bg-gray-800' disabled={isBtnDisabled}>{buttonText || 'Submit'}</Button>
    </form>
  )
}

export default React.memo(CommonForm)
