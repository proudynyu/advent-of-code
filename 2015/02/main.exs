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
    lowest = Enum.min(item)
    lowest
    # sum = lowest + Enum.scan(item, &(&1 + &2))
    # sum
  end)

IO.inspect(list)
IO.inspect(part_one, charlists: :as_list)
