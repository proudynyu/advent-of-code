defmodule Utils do
  defp is_increasing?([]), do: true
  defp is_increasing?([_]), do: true

  defp is_increasing?([a, b | rest]) do
    a < b && is_increasing?([b | rest])
  end

  defp is_decreasing?([]), do: true
  defp is_decreasing?([_]), do: true

  defp is_decreasing?([a, b | rest]) do
    a > b && is_decreasing?([b | rest])
  end

  def increase_or_decrease?([]), do: true
  def increase_or_decrease?([_]), do: true

  def increase_or_decrease?(list) do
    case list do
      [a, b | _] when a < b -> is_increasing?(list)
      [a, b | _] when a > b -> is_decreasing?(list)
      _ -> true
    end
  end

  def is_safe?([]), do: true
  def is_safe?([_]), do: true

  def is_safe?([a, b | rest] = list) do
    v = abs(a - b)
    is = is_increasing?(list) or is_decreasing?(list)

    cond do
      v > 0 and v <= 3 and is -> is_safe?([b | rest])
      true -> false
    end
  end

  def any?(list) do
    list
    |> Enum.with_index()
    |> Enum.any?(fn {_, i} ->
      f = Enum.slice(list, 0, i)
      s = Enum.slice(list, i + 1, length(list))

      new_list = [f | s] |> List.flatten()
      is_safe?(new_list)
    end)
  end

  def reduce(list_of_list) do
    list_of_list
    |> Enum.reduce(0, fn list, acc ->
      safed = is_safe?(list) or any?(list)

      value =
        if safed do
          1
        else
          0
        end

      acc + value
    end)
  end

  def is_valid_list?(list), do: is_safe?(list) and increase_or_decrease?(list)
end

defmodule Day2 do
  def read_file(filename) do
    File.read!(filename)
    |> String.split("\n", trim: true)
    |> Enum.map(fn x -> String.split(x, " ") end)
    |> Enum.map(&parse_numbers/1)
  end

  defp parse_numbers(list) do
    Enum.map(list, &String.to_integer/1)
  end

  def resolve_1(list_of_values) do
    list_of_values
    |> Enum.filter(&Utils.is_valid_list?/1)
    |> length
  end

  def resolve_2(list_of_values) do
    Utils.reduce(list_of_values)
  end
end

file = "../inputs/day_2.txt"

Day2.read_file(file)
|> Day2.resolve_1()
|> IO.inspect()

Day2.read_file(file)
|> Day2.resolve_2()
|> IO.inspect(charlists: :as_lists)
