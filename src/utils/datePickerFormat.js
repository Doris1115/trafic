

export function changeDataRangeValue(values) {
    if( values && values instanceof Array && values.length > 1) {
        const end = new Date(values[1])
        end.setHours(23)
        end.setMinutes(59)
        end.setSeconds(59)
        end.setMilliseconds(0)
        values[1] = end
        return values
    }    
  }