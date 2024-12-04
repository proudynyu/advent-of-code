defmodule Utils do
  defp is_increasing?([]), do: true
  defp is_increasing?([_]), do: true
  defp is_increasing?([a, b | rest]) do
    a < b && is_increasing?([ b | rest ])
  end

  defp is_decreasing?([]), do: true
  defp is_decreasing?([_]), do: true
  defp is_decreasing?([a, b | rest]) do
    a > b && is_decreasing?([ b | rest ])
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

  defp valid_pair?(a, b, :increase), do: b - a <= 3 and b - a > 0
  defp valid_pair?(a, b, :decrease), do: a - b <= 3 and a - b > 0

  def check_list([], _), do: nil
  def check_list([_], _), do: nil
  def check_list([a, b | rest], mode) do
    if not valid_pair?(a, b, mode) do
      0
    else
      case check_list([b | rest], mode) do
        nil -> nil
        idx -> idx + 1
      end
    end
  end

  def find_idx([a, b | _r] = list) do
    cond do
      a >= b -> check_list(list, :decrease)
      a <= b -> check_list(list, :increase)
      true -> nil
    end
  end

  def is_safe?([]), do: true
  def is_safe?([_]), do: true
  def is_safe?([a, b | rest]) do
    v = abs(a - b)
    cond do
      v > 0 and v <= 3 -> is_safe?([b | rest])
      true -> false
    end
  end

  def is_valid_list?(list), do: is_safe?(list) and increase_or_decrease?(list)
end

defmodule Main do
  def read_file(filename) do
    File.read!(filename)
    |> String.split("\n", trim: true)
    |> Enum.map(fn x -> String.split(x, " ") end)
    |> Enum.map(&parse_numbers/1)
  end

  defp parse_numbers(list) do
    Enum.map(list, &String.to_integer/1)
  end

  defp fix_sequence(list) do
    case Utils.find_idx(list) do
      nil -> list
      idx -> 
        first_list = List.delete_at(list, idx)
        second_list = if idx + 1 < length(list), do: List.delete_at(list, idx + 1), else: nil

        cond do
          Utils.is_valid_list?(first_list) -> first_list
          second_list && Utils.is_valid_list?(second_list) -> second_list
          true -> list
        end
    end
  end
  
  def resolve_1(list_of_values) do
    list_of_values
    |> Enum.filter(&Utils.is_valid_list?/1)
    |> length
  end

  def resolve_2(list_of_values) do
    list_of_values
    |> Enum.map(&fix_sequence/1)
    |> Enum.filter(&Utils.is_valid_list?/1)
    |> length

    # result should be 426, im at 423
  end

end

Main.read_file("./input.txt")
|> Main.resolve_1
|> IO.inspect

Main.read_file("./input.txt")
|> Main.resolve_2
|> IO.inspect([charlists: :as_lists])

