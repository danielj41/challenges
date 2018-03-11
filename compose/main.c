#include "string.h"
#include "stdio.h"
#include "stdlib.h"

typedef struct {
  void* (*f1)(void*);
  void* (*f2)(void*);
} composedFuncs;

void* runCompose(void* funcs, void* value) {
  composedFuncs* f = (composedFuncs*) funcs;
  return f->f1(f->f2(value));
}

void compose(void* (*f1)(void*), void* (*f2)(void*), void* (**c)(void*, void*), void** cparam) {
  composedFuncs* cparamfuncs = malloc(sizeof(composedFuncs)); // TODO: free()
  cparamfuncs->f1 = f1;
  cparamfuncs->f2 = f2;

  *c = &runCompose;
  *cparam = cparamfuncs;
}

void* add5(void* param) {
  int* result = malloc(sizeof(int)); // TODO: free()
  *result = *((int*)(param)) + 5;
  return result;
}

void* add10(void* param) {
  int* result = malloc(sizeof(int)); // TODO: free()
  *result = *((int*)(param)) + 10;
  return result;
}

int main() {
  void* (*myComposedFunc)(void*, void*);
  void* myComposedFuncParam;
  int* number;

  number = malloc(sizeof(int));
  *number = 22;

  compose(add5, add10, &myComposedFunc, &myComposedFuncParam);

  printf("%d\n", *((int*)(myComposedFunc(myComposedFuncParam, number))));

  return 0;
}
