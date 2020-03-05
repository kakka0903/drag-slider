# drag-slider
Calulates percentage based on where you click or drag to. 

### Implementation

1. Create and style HTML

```
<!-- Using Tailwind as an example  --!>
<div id="volume" class="rounded-full h-1 w-full flex items-center bg-gray-400">
  <div id="volume-current" class="w-0 h-full bg-gray-900 rounded-full"></div>
  <div id="volume-pointer" class="cursor-pointer w-4 h-4 bg-white border border-gray-500 rounded-full">
</div>
```

2. Instantiate the class:

```
volumeSlider = new dragSlider('volume-pointer','volume-current','volume','horizontal')
```

3. Hook into onDrag or onEnd function:

```
<!-- Using Howler as an example  --!>
this.volumeSlider.onDrag = function (percent) 
    <!-- Update Volume Based on percentage  --!>
    Howler.volume(percent)
}
```


