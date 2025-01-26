import React from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {

  const renderInputsByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || ''
    switch (getControlItem.componentType) {
      case 'input':
        element = <input type={getControlItem.type} name={getControlItem.name} placeholder={getControlItem.placeholder} id={getControlItem.name} value={value} onChange={(e) => setFormData({
          ...formData,
          [getControlItem.name] : e.target.value
        })}  className='px-5'/>
        break;
      case 'select':
        element = <Select onValueChange={(value) => setFormData({
          ...formData,
          [getControlItem.name] : value
        })} value={value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={getControlItem.placeholder} />
          </SelectTrigger>
          <SelectContent>
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
              <div key={controlItem.name} className='grid w-full'>
                <Label className="mb-1">{controlItem.label}</Label>
                {
                  renderInputsByComponentType(controlItem)
                }
              </div>
            )
          })
        }
      </div>
      <Button type='submit' className='mt-3 w-full'>{buttonText || 'Sign up'}</Button>
    </form>
  )
}

export default CommonForm
