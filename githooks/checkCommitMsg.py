import sys
import re

file_name = sys.argv[1]
f = open(file_name, "r")

message = f.read()

commit_mask = re.compile(r"PG-[0-9]* (fix|feat): [а-яА-Я\w\s]+")
commit_mask_merge = re.compile(r"Merge branch *")
matched = commit_mask.match(message) or commit_mask_merge.match(message)

if matched is None:
  print('''
  [СООБЩЕНИЕ КОММИТА] Сообщение должно быть в корректном формате!
      Формат должен быть таким:
      PG-[номер] [тип]: [название]
      [номер] - двухзначеное или трехзначное число, совпадающее с номером задачи
      [тип] - fix или feat
      [навзвание] - сообщение по-русски
  ''')
  exit(1)
else:
  print("Корректное сообщение коммита")
  exit(0)
