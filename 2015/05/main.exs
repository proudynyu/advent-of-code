defmodule Resolver do
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

  @spec create_vowels() :: list(String.t())
  defp create_vowels() do
    "aeiou"
      |> String.split()
      |> Enum.filter(fn x -> String.length(x) > 0 end)
      |> MapSet.new()
  end

  @spec no_forbiden_substrings?(String.t()) :: Atom.t()
  defp no_forbiden_substrings?(line) do
    not (
      line
      |> String.contains?(["ab", "cd", "pq", "xy"])
    )
  end

  @spec has_three_vowels?(String.t(), list(String.t())) :: Atom.t()
  defp has_three_vowels?(_line, _vowels) do
    true
  end

  @spec has_double_alpha_letter?(String.t()) :: Atom.t()
  defp has_double_alpha_letter?(_line) do
    true
  end

  @spec part_one(String.t()) :: Integer.t()
  def part_one(filename) do
    vowels = create_vowels()
    filename
      |> read_file()
      |> split_file_line()
      |> Enum.filter(fn line ->
          no_forbiden_substrings?(line)
          and has_double_alpha_letter?(line)
          and has_three_vowels?(line, vowels)
      end)
  end
end

filename = "example"
Resolver.part_one(filename)
  |> IO.inspect()

