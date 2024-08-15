{_, file} = File.read("./input")

defmodule Dimensions do
  def calculate_perimeters([w, l, h]) do
    [
      { 2 * w + 2 * l, { w, l }},
      { 2 * w + 2 * h, { w, h }},
      { 2 * l + 2 * h, { l, h }}
    ]
  end

  def get_min_perimeter(dimensions) do
    dimensions
      |> calculate_perimeters()
      |> Enum.min_by(fn { sum, _ } -> sum end)
  end

  def get_area([w, l, h]) do
    w * l * h
  end
end

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
  |> Enum.map(fn item_list ->
    {min_perimeter, _} = Dimensions.get_min_perimeter(item_list)
    area = Dimensions.get_area(item_list)
    area + min_perimeter
  end)
  |> Enum.sum()

IO.inspect(part_one)
IO.inspect(part_two, charlists: :as_lists)
