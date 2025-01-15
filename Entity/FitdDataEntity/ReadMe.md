This contains the DataEntity, which is the entity model used at external gates. They are used by the Api to send data via JSON, and they are used by the Gateway to send/retrieve data through external storage. 
- They are meant to be as dumb as possible, only holding onto the minimum amount of data required.
- They only use simple classes and data structures or basic primitives like string, bool, and int.
- They are meant to be flattened when reasonable.