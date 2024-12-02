defmodule Main do
  @spec read_file(String.t()) :: list(String.t())
  def read_file(filename) do
    {_, file} = File.read(filename)

    file
    |> String.split("\n", trim: true)
    |> Enum.map(fn x -> String.split(x, " ") end)
  end
  
  def verify_sub?(_t, size) when size === 1, do: true
  def verify_sub?([head | [head_2 | tail]], size) do
    v = abs(head - head_2)
    cond do
      v > 3 -> false
      v <= 0 -> false
      true -> 
        new_size = size - 1
        verify_sub?([head_2 | tail], new_size)
    end
  end

  def check_list?(_v, _o, size, _acc) when size === 1, do: true
  def check_list?([head | [head_2 | tail]], opt, size, acc) do
    type_of_list = if head < head_2 do :increase else :decrease end
    
    cond do
      opt === type_of_list -> 
        new_size = size - 1
        check_list?([head_2 | tail], opt, new_size, acc)

      opt !== type_of_list -> false
      true -> false
    end
  end

  def increase_or_decrease?([head | [head_2 | _tail]] = l) do
    is_increase = if head < head_2 do :increase else :decrease end
    size = length(l)
    check_list?(l, is_increase, size, [])
  end

  def resolve_1(list_of_values) do
    list_of_values
    |> Enum.map(fn x -> Enum.map(x, fn y -> String.to_integer(y) end) end)
    |> Enum.filter(fn l -> 
      size = length(l)
      verify_sub?(l, size) and increase_or_decrease?(l)
    end)
    |> length
  end

  def resolve_2(list_of_values) do
    list_of_values
    |> Enum.map(fn x -> Enum.map(x, fn y -> String.to_integer(y) end) end)
  end
end

Main.read_file("./example.txt")
|> Main.resolve_1
|> IO.inspect

Main.read_file("./example.txt")
|> Main.resolve_2
|> IO.inspect
