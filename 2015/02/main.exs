{_, file} = File.read("./example")

list = file
  |> String.trim()
  |> String.split("\n")
  |> Enum.map(fn line -> 
    String.split(line, "x")
      |> Enum.map(fn num -> String.to_integer(num) end)
  end)
  
part_one = list
  |> Enum.map(fn item ->
    [w, l, h] = item
    wrap = [w*l , w*h , h*l]
    lowest = Enum.min(wrap)

    wrap_sum = wrap
      |> Enum.map(fn n -> n*2 end)
      |> Enum.sum()

    wrap_sum + lowest
  end)
  |> Enum.sum()

part_two = list
  |> Enum.map(fn item ->
    # [w, l, h] = item
    # perimeters = Enum.scan(item, &(&1 * 2))
    # perimeters
    item
  end)

IO.inspect(part_one)
IO.inspect(part_two)
