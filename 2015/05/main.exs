defmodule Utils do 
  @spec read_file(String.t()) :: String.t()
  defp read_file(filename) do
    filename
    |> File.read()
    |> case do
      {:ok, file} -> 
        file
        |> String.trim()
      _ -> IO.puts("error reading file {filename}")
    end
  end

  @spec split_file_line(String.t()) :: list(String.t())
  defp split_file_line(file) do
    file
    |> String.split("\n")
  end
end

defmodule PartOne do
  @spec create_vowels() :: list(String.t())
  defp create_vowels() do
    "aeiou"
      |> String.graphemes()
  end

  @spec no_forbiden_substrings?(String.t()) :: Atom.t()
  defp no_forbiden_substrings?(line) do
    not (
      line
      |> String.contains?(["ab", "cd", "pq", "xy"])
    )
  end

  @spec has_three_vowels?(String.t(), list(String.t())) :: Atom.t()
  defp has_three_vowels?(line, vowels) do
    line
    |> String.graphemes()
    |> Enum.reduce(0, fn letter, acc -> 
      case Enum.member?(vowels, letter) do
        true -> acc + 1
        _ -> acc
      end
    end)
    |> case do
        x when x >= 3 -> true
        _ -> false
      end
  end

  @spec has_double_alpha_letter?(String.t()) :: Atom.t()
  defp has_double_alpha_letter?(line) do
    line
    |> String.graphemes()
    |> Enum.chunk_by(fn arg -> arg end)
    |> Enum.map(fn arg -> to_string(arg) end)
    |> Enum.filter(fn x -> String.length(x) > 1 end)
    |> length()
    |> case do
      x when x > 0 -> true
      _ -> false
    end
  end

  @spec resolve(String.t()) :: Integer.t()
  def resolve(filename) do
    vowels = create_vowels()
    filename
      |> Utils.read_file()
      |> Utils.split_file_line()
      |> Enum.filter(fn line ->
          no_forbiden_substrings?(line)
          and has_double_alpha_letter?(line)
          and has_three_vowels?(line, vowels)
      end)
      |> length()
  end
end

filename = "input"
Resolver.part_one(filename)
  |> IO.inspect()

